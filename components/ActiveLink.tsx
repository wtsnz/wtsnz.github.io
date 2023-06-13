"use client"; // if you are planing to use it in the component which is not marker with use client directive this is a must

import Link, { LinkProps } from "next/link";
// import { usePathname } from "next/navigation"; // usePathname is a hook now imported from navigation

// const ActiveLink = ({
//   children,
//   ...rest
//  }: { children: React.ReactNode } & LinkProps) => {
//    const { href } = rest;
//    const pathName = usePathname();

//    const isActive = pathName === href;
//      return (
//     // you get a global isActive class name, it is better than 
//     // nothing, but it means you do not have scoping ability in 
//     // certain cases
//        <Link {...rest} className={isActive ? "active" : ""}> 
//          {children}
//        </Link>
//    );
//   };

// export default ActiveLink;

import { useRouter, usePathname } from 'next/navigation'

const ActiveLink = ({
  children,
  href
 }: { children: React.ReactNode } & LinkProps) => {
    const router = useRouter()
    const pathName = usePathname();

    const isActive = pathName === href;
    const style = isActive ? 'font-bold' : 'md:block md:ml-2 md:pr-4 md:space-x-2'

    const handleClick = (e) => {
        e.preventDefault()
        router.push(href)
    }

    return (
      
        <a href={href} onClick={handleClick} className='px-4 py-2 rounded-md font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100'>
            {children}
        </a>
    )
}

export default ActiveLink