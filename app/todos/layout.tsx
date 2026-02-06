import DefaultLayout from '../../components/DefaultLayout'

export default function TodosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DefaultLayout>{children}</DefaultLayout>
}
