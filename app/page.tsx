import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import * as mutations from "@/src/graphql/mutations";
import * as queries from "@/src/graphql/queries";

import config from "@/src/amplifyconfiguration.json";

export const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies,
});

async function createTodo(formData: FormData) {
  "use server";

  await cookiesClient.graphql({
    query: mutations.createTodo,
    variables: {
      input: {
        name: formData.get("name")?.toString() ?? "",
      },
    },
  });

  revalidatePath("/");
}

export default async function Home() {
  const { data, errors } = await cookiesClient.graphql({
    query: queries.listTodos,
  });

  const todos = data.listTodos.items;

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <form action={createTodo}>
        <input name="name" placeholder="Add a todo" />
        <button type="submit">Add</button>
      </form>

      {(!todos || todos.length === 0 || errors) && (
        <div>
          <p>There are no todos right now. </p>
        </div>
      )}

      <ul>
        {todos.map((todo) => {
          return <li style={{ listStyle: "none" }}>{todo.name}</li>;
        })}
      </ul>
    </div>
  );
}
