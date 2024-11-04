import { useRouter } from "next/navigation";
import {logOut} from "@/app/v3/isLoggedIn";
import {ArrowRightOnRectangleIcon, Cog6ToothIcon, HomeIcon} from "@heroicons/react/24/outline";

const NavBar = () => {

    const router = useRouter();

    const goTo = (tab: string) => {
        switch (tab) {
            case "dashboardTab":
                router.push("/v3/dashboard");
                break;
            case "settingTab":
                router.push("/v3/new-password");
                break;
            case "closeSesion":
                if(confirm("Are you sure you want to log out?")){
                logOut();
                router.push("/v3");
                }
                break;
            default:
                break;
        }
    }

  return (
    <div className="font-sans p-4 absolute m-auto left-0 right-0 w-fit bottom-0">
      <ul className="flex bg-white w-max px-6 rounded-xl">
        <li
          onClick={() => goTo('dashboardTab')}
          id="dashboardTab"
          className="tab flex flex-col justify-center items-center text-sm font-semibold tracking-wider text-teal-500 py-3 px-6 cursor-pointer"
        >
          <HomeIcon  className={"h-6 w-6 text-gray-800 hover:text-teal-500 "} > </HomeIcon>
        </li>
        <li
          id="settingTab"
          onClick={() => goTo('settingTab')}
          className="tab flex flex-col justify-center items-center text-sm font-semibold tracking-wider text-gray-800 hover:text-teal-500 py-3 px-6 cursor-pointer"
        >
            <Cog6ToothIcon className={"h-6 w-6 text-gray-800 hover:text-teal-500 "} > </Cog6ToothIcon>
        </li>
        <li
          id="closeSesion"
          onClick={() => goTo('closeSesion')}
          className="tab flex flex-col justify-center items-center text-sm font-semibold tracking-wider text-gray-800 hover:text-teal-500 py-3 px-6 cursor-pointer"
        >
            <ArrowRightOnRectangleIcon className={"h-6 w-6 text-gray-800 hover:text-teal-500 "} > </ArrowRightOnRectangleIcon>
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
