import RegisterForm from "@/components/Register/form";

function Register() {
        return ( 
                      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-200 py-12 sm:px-6 lg:px-8">
                                {/* <pre>{JSON.stringify(session)}</pre> */}
              
                                <RegisterForm />
                        </main>
         );
}

export default Register;