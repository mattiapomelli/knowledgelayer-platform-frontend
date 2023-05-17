import { CourseCatalog } from "@components/course/course-catalog";
import { UsersList } from "@components/user/users-list";

const Home = () => {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold underline decoration-primary">
        Learn with your frens 🌿
      </h1>
      <div className="flex flex-col gap-10 md:flex-row">
        <CourseCatalog className="flex-1" />
        <div className="flex flex-col gap-6 md:w-[300px]">
          <UsersList className="w-full" />
        </div>
      </div>
    </>
  );
};

export default Home;
