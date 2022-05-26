import Image from 'next/image'
import { useCart } from '../../context/cart'
import { XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { message } from 'antd'

const IndividualItem = ({ product }) => {

    const [cart, cartAction] = useCart()

    return (
        <div className='container'>
            <div className='relative bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer'>
                <div className='overflow-x-hidden rounded-2xl relative'>
                    <Image
                        width={100}
                        height={70}
                        layout='responsive'
                        className='h-40 rounded-2xl w-full object-cover'
                        src={`http://localhost:1337${product.image.data.attributes.url}`}
                        alt='Shopping cart'
                    />
                    {
                        cart.find(x => x.id === product.id) ?
                            <p
                                onClick={() => cartAction(product, 'remove_from_cart')}
                                className='absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group'>
                                <XIcon className='h-6 w-6' />
                            </p> :
                            <p
                                onClick={() => product.inventory.available > 0 ? cartAction(product, 'add_to_cart') : message.warn('Product is currently unavailable')}
                                className='absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6 group-hover:opacity-50 opacity-70'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='black'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
                                </svg>
                            </p>
                    }
                </div>
                <div className='mt-4 pl-2 mb-2 flex justify-between'>
                    <div>
                        <p className='text-md font-semibold text-gray-900 mb-0'>{product.name}</p>
                        <p className='text-md text-red-500 mt-0'>₦{product.price.formatted}</p>
                    </div>
                    <div className='flex flex-col-reverse mb-1 mr-4 group cursor-pointer'>
                        <button className='px-3 py-1 bg-yellow-500 text-white rounded-sm text-sm remove-link-decoration'>
                            <Link href={`/product/${product.id}`}>Details</Link>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default IndividualItem