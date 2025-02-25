import React, { useState } from 'react'
import Link from 'next/link';

import userImage from "../../../../public/userImage.avif"
import Image from 'next/image';
interface MenuItem {
    title: string;
    route?: string;
    children?: MenuItem[];
  }
interface Props {
    item: MenuItem;
}

export default function Dropdown(props: Props) {
    const { item } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuItems = item?.children ? item.children : [];

    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen
        ?
        "flex opacity-100"
        :
        "opacity-0  hidden";

    return (
        <>
            <div className="relative">
                <button
                    className={`hover:text-blue-400 transition-all duration-500 `}
                    onClick={toggle}
                >
                  <Image src={userImage} width={40} height={40} className='object-cover rounded-full' alt={'user info'}/>

                </button>
                <div className={`absolute top-8  gap-y-1 -start-20 z-30 w-fit px-4 flex flex-col py-4 bg-white border border-gray-200 shadow-md text-black rounded-md ${transClass} transition-all duration-300`}>
                    {
                        menuItems.map(item =>
                            <Link
                                key={item.route}
                                className="hover:bg-gray-100 hover:text-blue-300 px-4 py-1"
                                href={item?.route || ''}
                                onClick={toggle}
                            >{item.title}</Link>
                        )
                        
                    }
                </div>
            </div>
            
        </>
    )
}