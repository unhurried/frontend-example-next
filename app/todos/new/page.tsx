"use client";

import { useRouter } from "next/navigation";
import { FormikConfig } from "formik";

import PageHeader from "../../../components/PageHeader";
import Form, { TodoForm } from "../../../components/Form";
import { trpc } from "../../../utils/trpc";

export default function TodoNewPage() {
  const router = useRouter();
  const todoCreate = trpc.todo.create.useMutation();

  const onSubmit: FormikConfig<TodoForm>["onSubmit"] = async (values) => {
    const result = await todoCreate.mutateAsync({
      title: values.title,
      category: values.category,
      content: values.content,
    });
    router.push(`/todos/${result.id}`);
  };

  return (
    <>
      <PageHeader router={router} buttons={[{ title: "Back to List", href: "/todos" }]}>
        Create
      </PageHeader>
      <Form initialValues={{ title: "", category: "one", content: "" }} onSubmit={onSubmit} />
    </>
  );
}
