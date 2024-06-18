import { ThemeToggle } from '@/components/theme/theme-toggle';
import Nav from './nav/nav';
import { Button } from '../ui/button';

function Header() {
	return (
		<header className='max-w-[1300px] w-full h-[80px] mx-auto flex items-center justify-between'>
			<Nav />
			<div className='flex items-center gap-5'>
				<Button variant={'ghost'}>Sign In</Button>
				<Button>Sign Up</Button>
				<ThemeToggle />
			</div>
		</header>
	);
}

export default Header;
