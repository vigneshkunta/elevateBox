

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8 mt-[-10px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <img
                  src="https://media.licdn.com/dms/image/v2/D560BAQFa5xRvyLrZ7g/company-logo_200_200/company-logo_200_200/0/1719379322506/elevatebox_logo?e=2147483647&v=beta&t=uPk-uTD-bgxcLvNLopalSUPdbsE4hCL3MGnb8gQZkcc"
                  alt="elevateBox Logo"
                  className="h-8 w-8 rounded-full"
                  loading="lazy"
                  draggable={false}
                />
                <span className="font-extrabold text-xl text-indigo-600">elevateBox</span>
              </div>
              <p className="text-gray-600 text-sm max-w-xs">
                ElevateBox is one of India's largest student communities that provides a one-stop platform for students to learn new skills, network with peers, and grow as an individual.
              </p>
            </div>

            <div>
              <h4 className="uppercase font-bold tracking-widest text-xs text-gray-500 mb-3">Company</h4>
              <ul>
                <li>
                  <a href="https://elevatebox.in/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 text-sm transition">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a href="https://elevatebox.in/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 text-sm transition">
                    Terms & conditions
                  </a>
                </li>
                <li>
                  <a href="https://elevatebox.in/cancellation-and-refund" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 text-sm transition">
                    Cancellation & Refund
                  </a>
                </li>
                <li>
                  <a href="https://elevatebox.in/contact" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 text-sm transition">
                    Contact us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="uppercase font-bold tracking-widest text-xs text-gray-500 mb-3">Quick Links</h4>
              <ul>
                <li>
                  <a href="https://elevatebox.in/copilot" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 text-sm transition">
                    copilot
                  </a>
                </li>
                <li>
                  <a href="https://elevatebox.in/job-application-tracker" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 text-sm transition">
                    job application tracker
                  </a>
                </li>
                <li>
                  <a href="https://elevatebox.in/companyproblems" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 text-sm transition">
                    Problems List
                  </a>
                </li>
                <li>
                  <a href="https://elevatebox.in/100xdevsregisterform" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 text-sm transition">
                    Register for 100xdevs
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-2">
            <span>
              © {new Date().getFullYear()} elevateBox. All rights reserved.
            </span>
            {/* <span>
              Made with <span className="text-red-500">♥</span> by elevateBox team.
            </span> */}
          </div>
        </div>
      </footer>
  )
}
