import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Surgimaax</h2>
            <p className="text-gray-300 mb-4">
              Leading medical instruments supply company in Coimbatore, providing premium quality 
              surgical instruments, diagnostic equipment, and medical devices to healthcare professionals.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">
                  123 Medical Street, Coimbatore, Tamil Nadu 641001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+91 422 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">info@surgimaax.com</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Products</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Surgical Instruments</li>
              <li>Diagnostic Equipment</li>
              <li>Patient Monitoring</li>
              <li>Laboratory Equipment</li>
              <li>Sterilization Equipment</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Equipment Supply</li>
              <li>Installation Support</li>
              <li>Maintenance Services</li>
              <li>Training & Support</li>
              <li>Warranty Services</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Surgimaax Medical Instruments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}