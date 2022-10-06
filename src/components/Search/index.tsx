import React from 'react';

import { Stack, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';

const Search = ({ onChange }): React.ReactElement => {
  const [value, setValue] = React.useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event);
  };

  const handleClear = () => {
    setValue('');
    onChange({ target: { value: '' } });
  };

  return (
    <Stack spacing={4} m="3">
      <InputGroup>
        <Input
          placeholder="Pesquise a disciplina"
          onChange={handleChange}
          value={value}
        />
        <InputRightElement
          children={
            value != '' ? (
              <SmallCloseIcon onClick={handleClear} color="green.500" />
            ) : (
              <SearchIcon color="green.500" />
            )
          }
        />
      </InputGroup>
    </Stack>
  );
};

export default Search;
