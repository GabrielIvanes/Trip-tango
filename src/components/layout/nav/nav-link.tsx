'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LinkInterface } from '@/lib/interfaces';

interface Props {
	link: LinkInterface;
	isNavigation: boolean;
	className?: string;
}

function NavLink({ link, isNavigation, className }: Props) {
	const pathname = usePathname();

	return (
		<div
			className={`${pathname !== link.path && isNavigation && 'opacity-45'} ${
				isNavigation && 'hover:opacity-100 transition ease-in delay-125'
			} ${className}`}
		>
			<Link href={link.path}>{link.name}</Link>
		</div>
	);
}

export default NavLink;
