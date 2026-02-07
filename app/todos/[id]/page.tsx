"use client";

import { FormikConfig } from "formik";
import { useParams, useRouter } from "next/navigation";

import PageHeader from "../../../components/PageHeader";
import Form, { TodoForm } from "../../../components/Form";
import { trpc } from "../../../utils/trpc";

export default function TodoEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const idParam = params?.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const todoQuery = trpc.todo.get.useQuery(id, { enabled: Boolean(id) });
  const todoMutation = trpc.todo.update.useMutation();

  if (!id) return <>Loading ...</>;
  if (!todoQuery.data) return <>Loading ...</>;

  const initialValues = {
    id: todoQuery.data.id,
    title: todoQuery.data.title,
    category: todoQuery.data.category,
    content: todoQuery.data.content ? todoQuery.data.content : "",
  };

  const onSubmit: FormikConfig<TodoForm>["onSubmit"] = async (values) => {
    await todoMutation.mutateAsync({
      id,
      title: values.title,
      category: values.category,
      content: values.content,
    });
    todoQuery.refetch();
    window.alert("Update succeeded.");
  };

  return (
    <>
      <PageHeader router={router} buttons={[{ title: "Back to List", href: "/todos" }]}>
        Update
      </PageHeader>
      <Form initialValues={initialValues} onSubmit={onSubmit} />
    </>
  );
}
