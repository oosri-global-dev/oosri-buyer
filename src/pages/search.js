import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import Search from "@/screens/SearchScreen/search";
import Head from "next/head";

const SearchPage = () => {
  return (
    <>
      <Head>
        <title>Search products | Oosri</title>
      </Head>
      <Search />
    </>
  );
};

SearchPage.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default SearchPage;
