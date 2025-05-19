// components/CardItem.tsx
import Link from "next/link";

interface CardItemProps {
  id: string;
  name: string;
  path: string;
  description?: string;
}

export default function CardItem({ id, name, path, description }: CardItemProps) {
  return (
    <section key={id} className="mb-6 h-full w-full min-w-[280px] max-w-full">
      <Link href={path} className="block h-full">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white break-words">
            {name}
          </h5>
          <p className="text-base font-normal text-gray-700 dark:text-gray-400 line-clamp-4">
            {description}
          </p>
        </div>
      </Link>
    </section>
  );
}

// Usage in parent component:
// <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//   {thisPageChildren.items.reverse().map((childPage: any) => (
//     <CardItem
//       key={childPage.id}
//       id={childPage.id}
//       name={childPage.name}
//       path={childPage.route.path}
//       description={childPage.properties.metaDescription}
//     />
//   ))}
// </ol>
