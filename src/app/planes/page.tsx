'use client';

import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { MdPlace } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { CommandList } from 'cmdk';
import { Calendar } from '@/components/ui/calendar';
import { getAmadeusAccessToken } from '@/lib/amadeus';

const formSchema = z
	.object({
		adults: z.string(),
		children: z.string(),
		class: z.string().optional(),
		locationFrom: z.number().positive({ message: 'Select a location' }),
		locationTo: z.number().positive({ message: 'Select a location' }),
		dateStart: z.date(),
		dateEnd: z.date().optional(),
		airportFrom: z.string().optional(),
		airportTo: z.string().optional(),
	})
	.refine(
		(data) => {
			const total = parseInt(data.adults) + parseInt(data.children);
			return total <= 9;
		},
		{
			message: 'The total number of adults and children must be 9 or less.',
			path: ['children'],
		}
	);

const villes = [
	{ id: 1, ville: 'New York' },
	{ id: 2, ville: 'Paris' },
	{ id: 3, ville: 'Tokyo' },
	{ id: 4, ville: 'Londres' },
	{ id: 5, ville: 'Berlin' },
	{ id: 6, ville: 'Sydney' },
	{ id: 7, ville: 'Rome' },
	{ id: 8, ville: 'Moscou' },
	{ id: 9, ville: 'Toronto' },
	{ id: 10, ville: 'Madrid' },
	{ id: 11, ville: 'Pékin' },
	{ id: 12, ville: 'Rio de Janeiro' },
	{ id: 13, ville: 'Istanbul' },
	{ id: 14, ville: 'Séoul' },
	{ id: 15, ville: 'Mumbai' },
	{ id: 16, ville: 'Le Caire' },
	{ id: 17, ville: 'Bangkok' },
	{ id: 18, ville: 'Buenos Aires' },
	{ id: 19, ville: 'Mexico' },
	{ id: 20, ville: 'Johannesburg' },
	{ id: 21, ville: 'Nairobi' },
	{ id: 22, ville: 'São Paulo' },
	{ id: 23, ville: 'Lima' },
	{ id: 24, ville: 'Hanoi' },
	{ id: 25, ville: 'Téhéran' },
	{ id: 26, ville: 'Bagdad' },
	{ id: 27, ville: 'Kaboul' },
	{ id: 28, ville: 'Manille' },
	{ id: 29, ville: 'Jakarta' },
	{ id: 30, ville: 'Kuala Lumpur' },
	{ id: 31, ville: 'Vienne' },
	{ id: 32, ville: 'Athènes' },
	{ id: 33, ville: 'Lisbonne' },
	{ id: 34, ville: 'Dublin' },
	{ id: 35, ville: 'Prague' },
	{ id: 36, ville: 'Budapest' },
	{ id: 37, ville: 'Varsovie' },
	{ id: 38, ville: 'Stockholm' },
	{ id: 39, ville: 'Oslo' },
	{ id: 40, ville: 'Copenhague' },
	{ id: 41, ville: 'Helsinki' },
	{ id: 42, ville: 'Reykjavik' },
	{ id: 43, ville: 'Zurich' },
	{ id: 44, ville: 'Bruxelles' },
	{ id: 45, ville: 'Amsterdam' },
	{ id: 46, ville: 'Edinburgh' },
	{ id: 47, ville: 'Glasgow' },
	{ id: 48, ville: 'Venise' },
	{ id: 49, ville: 'Milan' },
	{ id: 50, ville: 'Florence' },
	{ id: 51, ville: 'Naples' },
	{ id: 52, ville: 'Munich' },
	{ id: 53, ville: 'Francfort' },
	{ id: 54, ville: 'Hambourg' },
	{ id: 55, ville: 'Vienne' },
	{ id: 56, ville: 'Zurich' },
	{ id: 57, ville: 'Genève' },
	{ id: 58, ville: 'Lyon' },
	{ id: 59, ville: 'Marseille' },
	{ id: 60, ville: 'Nice' },
	{ id: 61, ville: 'Toulouse' },
	{ id: 62, ville: 'Bordeaux' },
	{ id: 63, ville: 'Brisbane' },
	{ id: 64, ville: 'Melbourne' },
	{ id: 65, ville: 'Adélaïde' },
	{ id: 66, ville: 'Perth' },
	{ id: 67, ville: 'Auckland' },
	{ id: 68, ville: 'Wellington' },
	{ id: 69, ville: 'Christchurch' },
	{ id: 70, ville: 'Dubai' },
	{ id: 71, ville: 'Abu Dhabi' },
	{ id: 72, ville: 'Doha' },
	{ id: 73, ville: 'Riyad' },
	{ id: 74, ville: 'Jérusalem' },
	{ id: 75, ville: 'Tel Aviv' },
	{ id: 76, ville: 'Hong Kong' },
	{ id: 77, ville: 'Shanghai' },
	{ id: 78, ville: 'Guangzhou' },
	{ id: 79, ville: 'Shenzhen' },
	{ id: 80, ville: 'Chengdu' },
	{ id: 81, ville: 'Nankin' },
	{ id: 82, ville: 'Wuhan' },
	{ id: 83, ville: 'Hangzhou' },
	{ id: 84, ville: 'Chongqing' },
	{ id: 85, ville: "Xi'an" },
	{ id: 86, ville: 'Taipei' },
	{ id: 87, ville: 'Bangkok' },
	{ id: 88, ville: 'Hô Chi Minh-Ville' },
	{ id: 89, ville: 'Singapour' },
	{ id: 90, ville: 'Kuala Lumpur' },
	{ id: 91, ville: 'Jakarta' },
	{ id: 92, ville: 'Manille' },
	{ id: 93, ville: 'Delhi' },
	{ id: 94, ville: 'Bangalore' },
	{ id: 95, ville: 'Chennai' },
	{ id: 96, ville: 'Calcutta' },
	{ id: 97, ville: 'Islamabad' },
	{ id: 98, ville: 'Lahore' },
	{ id: 99, ville: 'Karachi' },
	{ id: 100, ville: 'Dacca' },
] as const;

function Planes() {
	const [globalError, setGlobalError] = useState<string>('');
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			adults: '1',
			children: '0',
			locationFrom: 0,
			locationTo: 0,
			dateStart: new Date(),
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		console.log(await getAmadeusAccessToken());
	}

	return (
		<div className='w-full h-[calc(100vh-80px)]'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit, (errors) => {
						if (errors && errors.children && errors.children.message) {
							setGlobalError(errors.children.message);
						}
					})}
					className='space-y-2'
				>
					<div className='flex justify-center gap-10'>
						<FormField
							control={form.control}
							name='adults'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Select
											defaultValue={field.value}
											onValueChange={(event) => {
												setGlobalError('');
												field.onChange(event);
											}}
											required
										>
											<SelectTrigger className='w-[140px]'>
												<SelectValue placeholder='Adults' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='1'>1 Adult</SelectItem>
												<SelectItem value='2'>2 Adults</SelectItem>
												<SelectItem value='3'>3 Adults</SelectItem>
												<SelectItem value='4'>4 Adults</SelectItem>
												<SelectItem value='5'>5 Adults</SelectItem>
												<SelectItem value='6'>6 Adults</SelectItem>
												<SelectItem value='7'>7 Adults</SelectItem>
												<SelectItem value='8'>8 Adults</SelectItem>
												<SelectItem value='9'>9 Adults</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='children'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Select
											onValueChange={(event) => {
												setGlobalError('');
												field.onChange(event);
											}}
										>
											<SelectTrigger className='w-[140px]'>
												<SelectValue placeholder='Children' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='0'>--</SelectItem>
												<SelectItem value='1'>1 Child</SelectItem>
												<SelectItem value='2'>2 Children</SelectItem>
												<SelectItem value='3'>3 Children</SelectItem>
												<SelectItem value='4'>4 Children</SelectItem>
												<SelectItem value='5'>5 Children</SelectItem>
												<SelectItem value='6'>6 Children</SelectItem>
												<SelectItem value='7'>7 Children</SelectItem>
												<SelectItem value='8'>8 Children</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='class'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Select onValueChange={field.onChange}>
											<SelectTrigger className='w-[180px]'>
												<SelectValue placeholder='Class' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='0'>--</SelectItem>
												<SelectItem value='ECONOMY'>Economy</SelectItem>
												<SelectItem value='PREMIUM_ECONOMY'>
													Premium Economy
												</SelectItem>
												<SelectItem value='BUSINESS'>Business</SelectItem>
												<SelectItem value='FIRST'>First</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					{globalError && (
						<div className='text-sm font-medium text-destructive text-center'>
							{globalError}
						</div>
					)}

					<div className='flex justify-center pt-[12%] '>
						<div className='flex items-center justify-between w-full max-w-[1200px]'>
							<div>
								<FormField
									control={form.control}
									name='locationFrom'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormLabel className='text-sm'>From</FormLabel>
											<div className='relative'>
												<MdPlace className='absolute top-[50%] -translate-y-2/4 left-2 text-lg' />
												<Popover>
													<PopoverTrigger asChild>
														<Button
															variant='outline'
															role='combobox'
															className={cn(
																'w-[300px] justify-between pl-8',
																!field.value && 'text-muted-foreground'
															)}
														>
															{field.value
																? villes.find(
																		(ville) => ville.id === field.value
																  )?.ville
																: 'Search for a location'}
															<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
														</Button>
													</PopoverTrigger>
													<PopoverContent className='w-[300px] p-0 '>
														<Command>
															<CommandInput placeholder='Search for a city, airport, country, ...' />
															<CommandEmpty>No city found.</CommandEmpty>
															<CommandGroup className='max-h-[200px] overflow-y-auto'>
																<CommandList>
																	{villes.map((ville) => (
																		<CommandItem
																			value={ville.ville}
																			key={ville.id}
																			onSelect={() => {
																				form.setValue('locationFrom', ville.id);
																			}}
																			className='cursor-pointer'
																		>
																			<Check
																				className={cn(
																					'mr-2 h-4 w-4',
																					ville.id === field.value
																						? 'opacity-100'
																						: 'opacity-0'
																				)}
																			/>
																			{ville.ville}
																		</CommandItem>
																	))}
																</CommandList>
															</CommandGroup>
														</Command>
													</PopoverContent>
												</Popover>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div>
								<FormField
									control={form.control}
									name='locationTo'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormLabel className='text-sm'>To</FormLabel>
											<div className='relative'>
												<MdPlace className='absolute top-[50%] -translate-y-2/4 left-2 text-lg' />
												<Popover>
													<PopoverTrigger asChild>
														<Button
															variant='outline'
															role='combobox'
															className={cn(
																'w-[300px] justify-between pl-8',
																!field.value && 'text-muted-foreground'
															)}
														>
															{field.value
																? villes.find(
																		(ville) => ville.id === field.value
																  )?.ville
																: 'Search for a location'}
															<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
														</Button>
													</PopoverTrigger>
													<PopoverContent className='w-[300px] p-0 '>
														<Command>
															<CommandInput placeholder='Search for a city, airport, country, ...' />
															<CommandEmpty>No city found.</CommandEmpty>
															<CommandGroup className='max-h-[200px] overflow-y-auto'>
																<CommandList>
																	{villes.map((ville) => (
																		<CommandItem
																			value={ville.ville}
																			key={ville.id}
																			onSelect={() => {
																				form.setValue('locationTo', ville.id);
																			}}
																			className='cursor-pointer'
																		>
																			<Check
																				className={cn(
																					'mr-2 h-4 w-4',
																					ville.id === field.value
																						? 'opacity-100'
																						: 'opacity-0'
																				)}
																			/>
																			{ville.ville}
																		</CommandItem>
																	))}
																</CommandList>
															</CommandGroup>
														</Command>
													</PopoverContent>
												</Popover>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					</div>
					<div className='flex w-full justify-center'>
						<div className='border w-full max-w-[calc(1200px+1rem)] flex justify-between gap-5 px-2 py-7 rounded-md'>
							<div className='flex items-center gap-3 ml-1'>
								<FaPlaneDeparture className='text-xl' />
								<FormField
									control={form.control}
									name='airportTo'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<div className='relative'>
												<MdPlace className='absolute top-[50%] -translate-y-2/4 left-2 text-lg' />
												<Popover>
													<PopoverTrigger asChild>
														<Button
															variant='outline'
															role='combobox'
															className={cn(
																'w-[300px] justify-between pl-8',
																!field.value && 'text-muted-foreground'
															)}
														>
															{'Search for an airport'}
															<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
														</Button>
													</PopoverTrigger>
													<PopoverContent className='w-[300px] p-0 '>
														<Command>
															<CommandInput placeholder='Search for an airport ...' />
															<CommandEmpty>No airport found.</CommandEmpty>
															<CommandGroup className='max-h-[200px] overflow-y-auto'>
																<CommandList></CommandList>
															</CommandGroup>
														</Command>
													</PopoverContent>
												</Popover>
											</div>
										</FormItem>
									)}
								/>
							</div>

							<div className='border-l border-r flex justify-between flex-1 px-5 h-full'>
								<FormField
									control={form.control}
									name='dateStart'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={'outline'}
															className={cn(
																'w-[200px] pl-3 text-left font-normal',
																!field.value && 'text-muted-foreground'
															)}
														>
															{field.value ? (
																format(field.value, 'PPP')
															) : (
																<span>Pick a date</span>
															)}
															<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className='w-auto p-0' align='start'>
													<Calendar
														mode='single'
														selected={field.value}
														onSelect={field.onChange}
														disabled={(date) => date <= new Date()}
														initialFocus
														defaultMonth={form.getValues().dateStart}
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='dateEnd'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={'outline'}
															className={cn(
																'w-[200px] pl-3 text-left font-normal',
																!field.value && 'text-muted-foreground'
															)}
														>
															{field.value ? (
																format(field.value, 'PPP')
															) : (
																<span>Pick a date</span>
															)}
															<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className='w-auto p-0' align='start'>
													<Calendar
														mode='single'
														selected={field.value}
														onSelect={field.onChange}
														disabled={(date) =>
															date < form.getValues().dateStart
														}
														defaultMonth={form.getValues().dateStart}
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='flex items-center gap-3 mr-1'>
								<FormField
									control={form.control}
									name='airportTo'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<div className='relative'>
												<MdPlace className='absolute top-[50%] -translate-y-2/4 left-2 text-lg' />
												<Popover>
													<PopoverTrigger asChild>
														<Button
															variant='outline'
															role='combobox'
															className={cn(
																'w-[300px] justify-between pl-8',
																!field.value && 'text-muted-foreground'
															)}
														>
															{'Search for an airport'}
															<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
														</Button>
													</PopoverTrigger>
													<PopoverContent className='w-[300px] p-0 '>
														<Command>
															<CommandInput placeholder='Search for an airport ...' />
															<CommandEmpty>No airport found.</CommandEmpty>
															<CommandGroup className='max-h-[200px] overflow-y-auto'>
																<CommandList></CommandList>
															</CommandGroup>
														</Command>
													</PopoverContent>
												</Popover>
											</div>
										</FormItem>
									)}
								/>
								<FaPlaneArrival className='text-xl' />
							</div>
						</div>
					</div>

					<Button type='submit'>Submit</Button>
				</form>
			</Form>
		</div>
	);
}

export default Planes;
