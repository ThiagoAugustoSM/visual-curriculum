import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading } from '@chakra-ui/react';

import Header from '../../components/Header';
import { University } from '../../models/University';
import requestUniversities from '../../utils/requestCourses';

function Home(): React.ReactElement {
  const [universities, setUniversities] = React.useState<University[]>([]);

  useEffect(() => {
    async function loadCourses() {
      const response = await requestUniversities();
      setUniversities(response);
    }
    loadCourses();
  }, []);

  return (
    <Box m="5">
      <Header />
      <Heading as="h2" size="lg" marginY="2">
        Escolha o curso
      </Heading>

      {universities.map((university) => (
        <Flex flexDirection={`column`} key={university.key}>
          <Flex
            m={4}
            p={2}
            ml={0}
            color={`#fff`}
            borderRadius={4}
            alignItems={'center'}
            backgroundColor="#1a202c"
          >
            <img
              src={university.logo}
              style={{ height: '70px', width: 'auto' }}
            />
            <h2 style={{ marginLeft: '1em' }}> {university.name} </h2>
          </Flex>
          <Flex gap={1} wrap={'wrap'}>
            {university.courses.map((course) => (
              <Link
                key={course.key}
                to={`/${university.key}/${course.key}`}
                style={{
                  color: '#000',
                  width: '450px',
                  height: '125px',
                  background: '#FFF',
                }}
              >
                <Box
                  p="3"
                  display="flex"
                  fontSize="lg"
                  h={'100%'}
                  maxW="md"
                  minW="100px"
                  minH="100px"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  alignItems="center"
                >
                  <img
                    src={process.env.PUBLIC_URL + course.logo}
                    width="100px"
                    height="100px"
                  />
                  {course.name}
                </Box>
              </Link>
            ))}
          </Flex>
        </Flex>
      ))}
    </Box>
  );
}
export default Home;
