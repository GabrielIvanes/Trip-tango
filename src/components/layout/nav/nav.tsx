'use client';

import Image from 'next/image';
import Link from 'next/link';

import logo from '/public/logo.png';
import NavLinks from './nav-links';

function Nav() {
	return (
		<nav className='flex items-center gap-20'>
			<div>
				<Link href='/' className='flex gap-2 items-center group'>
					<Image src={logo} alt='Logo of TripTango' width={30} height={30} />
					<div className='group-hover:opacity-45 transition ease-in delay-125 text-xl'>
						TripTango
					</div>
				</Link>
			</div>
			<NavLinks />
		</nav>
	);
}

export default Nav;
