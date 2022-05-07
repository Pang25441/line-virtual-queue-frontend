import { NextPage } from "next";
import { useRouter } from "next/router";

const SettingPageLanding: NextPage = (props) => {
    const router = useRouter();

     router.push("/admin/setting/line");

     return null;
};

export default SettingPageLanding;
