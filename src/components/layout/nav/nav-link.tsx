'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LinkInterface } from '@/lib/interfaces';

interface Props {
	link: LinkInterface;
}

function NavLink({ link }: Props) {
	const pathname = usePathname();

	return (
		<div
			className={`${
				pathname !== link.path && 'opacity-45'
			} hover:opacity-100 transition ease-in delay-125`}
		>
			<Link href={link.path}>{link.name}</Link>
		</div>
	);
}

export default NavLink;
