import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

const Navigator = (): React.ReactElement => {
  const [university, setUniversity] = React.useState('UFPE');
  const [course, setCourse] = React.useState('engenhariaDaComputacao');
  const params = useParams();

  useEffect(() => {
    let formattedCourse = '';
    let courseName = params.course as string;
    courseName = courseName[0].toUpperCase() + courseName.slice(1);

    do {
      let nextUpper = courseName.slice(1).search(/[A-Z]/g);
      if (nextUpper === -1) nextUpper = courseName.length;
      formattedCourse += courseName.slice(0, nextUpper + 1) + ' ';
      courseName = courseName.slice(nextUpper + 1);
    } while (courseName.length > 0);

    setUniversity(params.university as string);
    setCourse(formattedCourse);
  }, [params]);

  return (
    <Breadcrumb size="20" m="3" separator="/">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">{university}</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#" isCurrentPage>
          {course}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default Navigator;
