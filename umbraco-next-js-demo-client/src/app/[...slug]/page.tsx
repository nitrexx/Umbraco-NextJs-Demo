export const dynamic = 'force-dynamic';

import { GetAllContentPagedAsync, GetChildrenOfDocumentAsync, GetPageAsync } from "@/services/services.umbraco/services.umbraco.content";
import RenderDefaultUmbracoProperties from "../Common/render-default-umb-properties";
import Header from "../Common/header";
import SiteMapComponent from "../Common/sitemap-component";
import RenderUmbracoBlocklistRow from "../Common/render-umbraco-blocklist-row";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { GenerateDynamicUmbracoMetadataAsync } from "../Common/Helpers/generate-dynamic-umbraco-metadata";
import CardItem from "../Common/card-item/card-item";

const page = async ({ params }: { params: any }) => {

    /** 
     * Hacky redirect from /website/home → /
     */
    if (params.slug[0] === 'home') {
        redirect('/');
    }

    const thisPage = await GetPageAsync(params.slug.join('/'));
    const thisPageChildren = await GetChildrenOfDocumentAsync(thisPage.id);

    return (
        <>
            <div className='grid grid-cols-6 gap-4'> 
                <div className='col-span-6 pb-12'>
                    <Header thisPage={thisPage} />
                </div>
                <div className='col-span-4'>
                    <div className="max-w-prose">
                        {thisPage.properties.contentBlocks && (
                            <section className="">
                                {thisPage.properties.contentBlocks.items.map((contentRow: any) => (
                                    <section key={contentRow.content.id} className="gap-7 mb-6 space-y-6">
                                        <RenderUmbracoBlocklistRow content={contentRow.content} settings={contentRow.settings} />
                                    </section>
                                ))}
                            </section>
                        )}
                    </div>

                    <div>
                        {thisPageChildren.items && (
                            <>
                                <ol className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 items-stretch">
                                    {thisPageChildren.items.reverse().map((childPage: any) => (
                                        <CardItem
                                            key={childPage.id}
                                            id={childPage.id}
                                            name={childPage.name}
                                            path={childPage.route.path}
                                            description={childPage.properties.metaDescription}
                                        />
                                    ))}
                                </ol>
                            </>
                        )}
                    </div>
                </div>

                <div className='col-span-2 border-solid border-2 border-indigo-600 p-2 space-y-6'>
                    <h3 className='text-xl'>Umbraco Properties for page</h3>
                    <p>This page is a dynamic [...slug]/page.tsx, rendered by <code>./src/app/[...slug]/page.tsx</code></p>
                    <p>This page is of type <code>{thisPage.contentType}</code></p>
                    <p>This page has <code>{thisPageChildren.total}</code> child pages</p>

                    <RenderDefaultUmbracoProperties umbProps={thisPage} />
                    <SiteMapComponent />
                </div>
            </div>
        </>
    );
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
    return await GenerateDynamicUmbracoMetadataAsync(params.slug.join('/'));
}
// export async function generateStaticParams(): Promise<any> {
//     // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#paths
//     const posts = await GetAllContentPagedAsync(100);

//     /** 
//      * The umbraco path is a full url path like:
//      *  /blog-posts/generative-artificial-intelligence-a-new-frontier-in-creativity-and-innovation
//      * We want that split up into an array of strings, which this method does
//      */
//     return posts.items.map((post: any) => ({
//         slug: post.route.path.split('/').filter(notEmpty)
//       }))


//       function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
//         return value !== null && value !== undefined && value !== '';
//     }

// };
export default page;
