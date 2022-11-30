import React from 'react'

const Navbar = () => {
    return (
        <>
           {/* <!-- Navbar goes here --> */}
		<nav className="bg-white shadow-lg">
			<div className="max-w-8xl mx-auto px-3">
				<div className="flex justify-between">
					<div className="flex space-x-7">
						<div>
							{/* <!-- Website Logo --> */}
							<a href="#" className="flex items-center py-4 px-2">
								<img src="logo.png" alt="Logo" className="h-8 w-8 mr-2"/>
								<span className="font-semibold text-gray-500 text-lg">Navigation</span>
							</a>
						</div>
						{/* <!-- Primary Navbar items --> */}
						<div className="hidden md:flex items-center space-x-1">
							<a href="" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold ">首页</a>
							<a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">房间管理</a>
							<a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"> 用户管理 </a>
							<a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">                         
                                申请管理
                            </a>
                            <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">                         
                                报表管理
                            </a>
                            <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">                         
                            回水管理
                            </a>
                            <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">                         
                            现场监控 
                            </a>
                            <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">                         
                            消息设置
                            </a>
                            <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">                         
                            赔率设置 
                            </a>
                            <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">                         
                            上盘助手 
                            </a>
                            <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">                         
                            上盘助手
                            </a>
                            <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">                         
                            上盘助手
                            </a>
						</div>
					</div>
					{/* <!-- Secondary Navbar items --> */}
					<div className="hidden md:flex items-center space-x-3 ">
						<a href="" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</a>
						<a href="" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</a>
					</div>
					{/* <!-- Mobile menu button --> */}
					<div className="md:hidden flex items-center">
						<button className="outline-none mobile-menu-button">
						<svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
							x-show="!showMenu"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokelidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
					</div>
				</div>
			</div>
			<div className="hidden mobile-menu">
				<ul className="">
					<li className="active"><a href="index.html" className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
					<li><a href="#services" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Services</a></li>
					<li><a href="#about" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
					<li><a href="#contact" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</a></li>
				</ul>
			</div>
			{/* <script>
				const btn = document.querySelector("button.mobile-menu-button");
				const menu = document.querySelector(".mobile-menu");

				btn.addEventListener("click", () => {
					menu.classList.toggle("hidden");
				});
			</script> */}
		</nav>
        </>
    )
}

export default Navbar