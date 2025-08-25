import { Shield, Users, Award, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Surgimaax
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your trusted partner in medical equipment supply since 2008. We are committed 
              to providing healthcare professionals with the finest medical instruments and 
              exceptional service in Coimbatore and across Tamil Nadu.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Founded in 2008, Surgimaax began as a small family-owned business with 
                  a simple mission: to provide healthcare professionals in Coimbatore with 
                  access to the highest quality medical instruments and equipment.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Over the years, we have grown from a local supplier to a trusted regional 
                  partner, serving hospitals, clinics, and healthcare facilities across Tamil Nadu. 
                  Our commitment to quality, service, and innovation has made us a preferred 
                  choice for medical professionals.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Today, Surgimaax continues to evolve, embracing new technologies and 
                  expanding our product range to meet the changing needs of modern healthcare.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">15+</div>
                  <div className="text-gray-600 dark:text-gray-300">Years of Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
                  <div className="text-gray-600 dark:text-gray-300">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">1000+</div>
                  <div className="text-gray-600 dark:text-gray-300">Products Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">24/7</div>
                  <div className="text-gray-600 dark:text-gray-300">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission & Vision
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  To provide healthcare professionals with access to the highest quality medical 
                  instruments and equipment, backed by exceptional service and technical support. 
                  We are committed to improving patient care through reliable, innovative medical solutions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  To be the leading medical equipment supplier in South India, known for our 
                  commitment to quality, innovation, and customer satisfaction. We envision a 
                  future where every healthcare facility has access to the best medical technology.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These values guide everything we do and help us serve our customers better
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Quality First</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We never compromise on quality. Every product we supply meets or exceeds 
                international standards and certifications.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Customer-Centric</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our customers are at the heart of everything we do. We listen, understand, 
                and deliver solutions tailored to their needs.
              </p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We strive for excellence in every aspect of our business, from product 
                selection to after-sales support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Visit Our Location
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Located in the heart of Coimbatore's medical district
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Our Office
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Address</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      123 Medical Street<br />
                      RS Puram, Coimbatore<br />
                      Tamil Nadu 641002
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Business Hours</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday: 10:00 AM - 5:00 PM
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Contact</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Phone: +91 422 123 4567<br />
                      Email: info@surgimaax.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-300">Map placeholder</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}