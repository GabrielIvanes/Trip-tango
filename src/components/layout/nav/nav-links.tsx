import { LinkInterface } from '@/lib/interfaces';
import NavLink from './nav-link';

const linksData: LinkInterface[] = [
	{ name: 'Planes', path: '/planes' },
	{ name: 'Hotels', path: '/hotels' },
	{ name: 'Contact', path: '/contact' },
];

function NavLinks() {
	return (
		<div className='flex gap-10'>
			{linksData.map((link) => (
				<NavLink link={link} key={link.name} isNavigation={true} />
			))}
		</div>
	);
}

export default NavLinks;
