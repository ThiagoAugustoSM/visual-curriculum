import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

type NavigatorProps = {
  university: string;
  course: string;
};

const Navigator = ({
  university,
  course,
}: NavigatorProps): React.ReactElement => {
  if (!university && !course) return <></>;

  return (
    <Breadcrumb size="20" m="3" separator="/">
      <BreadcrumbItem>
        <BreadcrumbLink href="#">{university}</BreadcrumbLink>
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
