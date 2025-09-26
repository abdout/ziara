import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/TodoList";
import { auth } from "@clerk/nextjs/server";

const Homepage = async () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList cards={[
          { title: "Total Revenue", value: "$45,231.89", description: "+20.1% from last month" },
          { title: "Subscriptions", value: "+2350", description: "+180.1% from last month" },
          { title: "Sales", value: "+12,234", description: "+19% from last month" },
          { title: "Active Now", value: "+573", description: "+201 since last hour" },
        ]} />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <TodoList />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList cards={[
          { title: "Product A", value: "1,234", description: "Units sold this month" },
          { title: "Product B", value: "987", description: "Units sold this month" },
          { title: "Product C", value: "654", description: "Units sold this month" },
          { title: "Product D", value: "321", description: "Units sold this month" },
        ]} />
      </div>
    </div>
  );
};

export default Homepage;
