import * as queries from "@/src/graphql/queries";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";

import config from "@/src/amplifyconfiguration.json";

export const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies,
});

export default async function Home() {
  const { data, errors } = await cookiesClient.graphql({
    query: queries.listTodos,
  });

  const todos = data.listTodos.items;
  if (!todos || todos.length === 0 || errors) {
    return (
      <div>
        <p>There are no todos right now. </p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <form>
        <input placeholder="Add a todo" />
        <button>Add</button>
      </form>

      <ul>
        <li style={{ listStyle: "none" }}>one</li>
        <li style={{ listStyle: "none" }}>one</li>
        <li style={{ listStyle: "none" }}>one</li>
        <li style={{ listStyle: "none" }}>one</li>
        <li style={{ listStyle: "none" }}>one</li>
        <li style={{ listStyle: "none" }}>one</li>
        <li style={{ listStyle: "none" }}>one</li>
        {/*todos.map(todo => {
          return <li>{todo}</li>
        })*/}
      </ul>
    </div>
  );
}
