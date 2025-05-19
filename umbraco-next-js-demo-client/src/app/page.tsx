import { GetDescendantsOfDocumentAsync, GetPageAsync } from "@/services/services.umbraco/services.umbraco.content";
import SiteMapComponent from "./Common/sitemap-component";
import Link from "next/link";
import RenderDefaultUmbracoProperties from "./Common/render-default-umb-properties";
import Header from "./Common/header";
import RenderUmbracoBlocklistRow from "./Common/render-umbraco-blocklist-row";
import { GenerateDynamicUmbracoMetadataAsync } from "./Common/Helpers/generate-dynamic-umbraco-metadata";
import { Metadata } from "next";
import { ROOT_UMBRACO_GUID } from "./lib/constants";
import CardItem from "./Common/card-item/card-item";



const Home = async () => {
  const thisPage = await GetPageAsync('/');

  const thisPageDescendants = await GetDescendantsOfDocumentAsync(ROOT_UMBRACO_GUID);

  return (<>
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
          {thisPageDescendants.items && (
            <>
              <ol className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 items-stretch'>
                {thisPageDescendants.items.reverse().map((childPage: any) => (
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

      <div className='col-span-2  border-solid border-2 border-indigo-600 p-2 space-y-6'>
        <h3 className='text-xl'>Umbraco Properties for page</h3>
        <p className=''>This page is a dynamic [...slug], rendered by <code>./src/app/[...slug]/page.tsx</code></p>
        <p className=''>This page is of type <code>{thisPage.contentType}</code></p>
        <p className=''>This page has <code>{thisPageDescendants.total}</code> child pages</p>

        <RenderDefaultUmbracoProperties umbProps={thisPage} />
        <SiteMapComponent />

      </div>
    </div>
  </>
  );
}

/**
 * Generates the page's metadata
 * @param param0 
 * @returns 
 */
export async function generateMetadata(): Promise<Metadata> {
  return await GenerateDynamicUmbracoMetadataAsync('/home');
}


export default Home;
