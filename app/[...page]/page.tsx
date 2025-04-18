import {builder} from "@builder.io/sdk";
import {cookies} from "next/headers";
import {RenderBuilderContent} from "../../components/builder";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
}

// export const revalidate = 500;

export default async function Page(props: PageProps) {
  const builderModelName = "page";

  const cookieStore = cookies();
  const userLocale = cookieStore.get("locale")?.value || "en-US";

  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (props?.params?.page?.join("/") || ""),
        locale: userLocale,
      },
      locale: userLocale,
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
