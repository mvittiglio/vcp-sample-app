import {builder} from "@builder.io/sdk";
import {cookies} from "next/headers";
import {RenderBuilderContent} from "../components/builder";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Homepage(props: PageProps) {
  const builderModelName = "figma-imports";

  const cookieStore = cookies();
  const userLocale = cookieStore.get("locale")?.value || "en-US";

  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/",
        options: {
          enrich: true,
          locale: userLocale,
        },
        locale: userLocale,
      },
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent locale={userLocale} content={content} model={builderModelName} options={{enrich: true}} />
    </>
  );
}
