import React from "react";
import { Row, Col, Form } from "antd";
import { Edit, useForm } from "@refinedev/antd";
import { UPDATE_COMPANY_MUTATION } from "@/graphql/mutations";
import { CustomAvatar } from "@/components";
import { getNameInitials } from "@/utilities-first";

function EditPage() {
  const { saveButtonProps, formProps, formLoading, queryResult } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });

  //destructure avatarUrl
  const { avatarUrl, name } = queryResult?.data?.data || {};

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
          >
            <Form {...formProps} layout="vertical">
              <CustomAvatar
                shape="square"
                src={avatarUrl}
                name={getNameInitials(name || "")}
                style={{ width: "96", height: "96", marginBottom: "24px" }}
              />
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
}

export default EditPage;
