import { BiSolidPlaneAlt } from 'react-icons/bi';
import { RiHotelBedFill } from 'react-icons/ri';

import NavLink from '@/components/layout/nav/nav-link';
import { Button } from '@/components/ui/button';
import TypewriterComponent from '@/components/ui/typewriter';

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center gap-20 w-full h-[calc(100vh-160px)]'>
			{/*  */}
			<h1 className='text-6xl font-bold'>
				<TypewriterComponent
					words={[
						'Bienvenue',
						'Willkommen',
						'Welcome',
						'أهلاً وسهلاً بك',
						'Добре дошли',
						'欢迎光临',
						'환영',
						'Velkommen',
						'Bienvenido',
						'Tere tulemast',
						'Tervetuloa',
						'Καλώς ήρθατε',
						'Üdvözöljük',
						'Selamat datang',
						'Benvenuti',
						'ようこそ',
						'Laipni lūdzam',
						'Sveiki atvykę',
						'Welkom',
						'Witamy',
						'Bem-vindo',
						'Bine ați venit',
						'Добро пожаловать',
						'Vitajte na',
						'Dobrodošli',
						'Välkommen',
						'Vítejte na',
						'Hoş geldiniz',
						'Ласкаво просимо',
					]}
				/>
			</h1>
			<div className='flex gap-10'>
				<Button className='flex items-center gap-2'>
					<BiSolidPlaneAlt className='text-2xl' />
					<NavLink
						link={{ name: 'Planes', path: '/planes' }}
						isNavigation={false}
						className='text-2xl'
					/>
				</Button>
				<Button variant={'secondary'} className='flex items-center gap-2'>
					<RiHotelBedFill className='text-2xl' />
					<NavLink
						link={{ name: 'Hotels', path: '/hotels' }}
						isNavigation={false}
						className='text-2xl'
					/>
				</Button>
			</div>
		</div>
	);
}
