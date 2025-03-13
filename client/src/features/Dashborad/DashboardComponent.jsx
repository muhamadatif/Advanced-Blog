import {
  HiAnnotation,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";

import { useGetPosts } from "../posts/useGetPosts";
import { useGetUsers } from "../users/useGetUsers";
import { useGetComments } from "../comments/useGetComments";
import StatsCard from "../../components/StatsCard";
import UsersStatsTable from "../users/RecentUsersTable.jsx";
import RecentCommentsTable from "../comments/RecentCommentsTable.jsx";
import RecentPostsTable from "../posts/RecentPostsTable.jsx";

const DashboardComponent = () => {
  const { data: dataPosts, isLoading: isLoadingPosts } = useGetPosts({
    limit: 5,
  });
  const { posts, totalPosts, lastMonthPosts } = dataPosts?.pages?.[0] || {};

  const { data: dataUsers, isLoading: isLoadingUsers } = useGetUsers({
    limit: 5,
  });
  const { users, totalUsers, lastMonthUsers } = dataUsers?.pages?.[0] || {};

  const { data: dataComments, isLoading: isLoadingComments } = useGetComments({
    limit: 5,
  });
  const { comments, totalComments, lastMonthComments } =
    dataComments?.pages?.[0] || {};

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        <StatsCard
          header={"Users"}
          totalItems={totalUsers}
          lastMonthItems={lastMonthUsers}
          icon={HiOutlineUserGroup}
          isLoading={isLoadingUsers}
        />

        <StatsCard
          totalItems={totalComments}
          lastMonthItems={lastMonthComments}
          header={"Comments"}
          icon={HiAnnotation}
          isLoading={isLoadingComments}
        />
        <StatsCard
          totalItems={totalPosts}
          lastMonthItems={lastMonthPosts}
          header={"Posts"}
          icon={HiDocumentText}
          isLoading={isLoadingPosts}
        />
      </div>

      <div className="mx-auto flex flex-wrap justify-center gap-4 py-3">
        <UsersStatsTable users={users} isLoading={isLoadingUsers} />
        <RecentCommentsTable
          comments={comments}
          isLoading={isLoadingComments}
        />
        <RecentPostsTable posts={posts} isLoading={isLoadingComments} />
      </div>
    </div>
  );
};

export default DashboardComponent;
