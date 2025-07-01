import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative py-10 fixed bottom-0 left-0 w-full sm:static" style={{background: '#328e6e', zIndex: 50}}>
            <div className="relative mx-auto px-4">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-stretch sm:gap-0">
                    <div className="w-full p-2 flex flex-col items-center text-center sm:p-4 md:w-1/2 sm:items-start sm:text-left ">
                        <div className="flex justify-center w-full mb-4 sm:hidden">
                            <Logo width="160px" />
                        </div>
                        <div className="hidden sm:mb-4 sm:inline-flex sm:items-center">
                            <Logo width="160px" />
                        </div>
                        <div className="flex h-full flex-col justify-between">
                            <div>
                                <p className="text-sm" style={{color: '#fff'}}>
                                    &copy; Copyright 2023. All Rights Reserved by DevUI.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-2 flex flex-col items-center text-center sm:p-6 md:w-1/2 lg:w-2/12 sm:items-start sm:text-left ">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase" style={{color: '#90c67c'}}>
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium"
                                        style={{color: '#fff'}}
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium"
                                        style={{color: '#fff'}}
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium"
                                        style={{color: '#fff'}}
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium"
                                        style={{color: '#fff'}}
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-2 flex flex-col items-center text-center sm:p-6 md:w-1/2 lg:w-2/12 sm:items-start sm:text-left ">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase" style={{color: '#90c67c'}}>
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium"
                                        style={{color: '#fff'}}
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium"
                                        style={{color: '#fff'}}
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium"
                                        style={{color: '#fff'}}
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium"
                                        style={{color: '#fff'}}
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-2 flex flex-col items-center text-center sm:p-6 md:w-1/2 lg:w-3/12 sm:items-start sm:text-left ">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase" style={{color: '#90c67c'}}>
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium"
                                        style={{color: '#fff'}}
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium"
                                        style={{color: '#fff'}}
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium"
                                        style={{color: '#fff'}}
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer