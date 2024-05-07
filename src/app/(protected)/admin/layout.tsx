import Header from '@/components/Header/Header';
import Wrapper from '@/components/Wrapper/Wrapper';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header></Header>
      <Wrapper>{children}</Wrapper>
    </>
  );
}
