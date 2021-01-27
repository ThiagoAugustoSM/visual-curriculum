import React from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

const Navigator = (): React.ReactElement => {
  return (
    <Breadcrumb size="20" m="3" separator="/">
      <BreadcrumbItem>
        <BreadcrumbLink href="#">UFPE</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#" isCurrentPage>
          Engenharia da Computação
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default Navigator;
