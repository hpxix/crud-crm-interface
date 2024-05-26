import React from "react";
import { Modal, Input, Select, Form, Col, Row, InputNumber } from "antd";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { UPDATE_COMPANY_MUTATION } from "@/graphql/mutations";
import { CustomAvatar } from "@/components";
import { getNameInitials } from "@/utilities-first";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "@/graphql/types";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import SelectOptionWithAvatar from "@/components/select-option-with-avatar";
import {
  businessTypeOptions,
  companySizeOptions,
  industryOptions,
} from "@/components/constants";
import { CompanyContactsTable } from "./contact-table";

function EditPage() {
  //useForm For the Company Form
  const { saveButtonProps, formProps, formLoading, queryResult } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });

  //useSelect Hook for CompanyOwnerId:
  const { selectProps, queryResult: queryResultUsers } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    optionLabel: "name",
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
    pagination: {
      mode: "off",
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
              <Form.Item
                label="اسم الشركه"
                name="name"
                initialValue={formProps?.initialValues?.salesOwner?.id}
              >
                <Input placeholder="Please Enter Company name" />
              </Form.Item>
              <Form.Item
                label="ممثل المبيعات"
                name="salesOwnerId"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Please select a sales owner"
                  {...selectProps}
                  options={queryResultUsers.data?.data.map((user: any) => ({
                    value: user.id,
                    label: (
                      <SelectOptionWithAvatar
                        name={user.name}
                        avatarUrl={user.avatarUrl ?? undefined}
                      ></SelectOptionWithAvatar>
                    ),
                  }))}
                />
              </Form.Item>
              <Form.Item label="حجم النشاط">
                <Select options={companySizeOptions} />
              </Form.Item>
              <Form.Item label="قيمة النشاط">
                <InputNumber
                  autoFocus
                  addonBefore="ريال"
                  min={0}
                  placeholder="0,00"
                />
              </Form.Item>
              <Form.Item label="نوع النشاط">
                <Select options={businessTypeOptions} />
              </Form.Item>
              <Form.Item label="المدينه" name="country">
                <Input placeholder="المدينه" />
              </Form.Item>
              <Form.Item label="الموقع الاكتروني" name='website'>
                <Input placeholder="الموقع الاكتروني" />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
        <Col>
        <CompanyContactsTable />
        </Col>
      </Row>
    </div>
  );
}

export default EditPage;
