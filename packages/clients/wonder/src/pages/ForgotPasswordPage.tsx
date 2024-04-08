import { useForgotPasswordMutation } from '@/store/features/auth.slice';
import { useState } from 'react';

export const ForgotPasswordPage: React.FC = () => {
    const [user, setUser] = useState({ email: '', password: '' });

    type TypeError = { status: number; data: { message: string } } | undefined;

    const [
        ForgotPasswordMutation,
        { isSuccess, isError, error, data: response },
    ] = useForgotPasswordMutation();

    let err: TypeError = undefined;

    if (isSuccess && response) {
        const { success, message } = response;
        if (success) {
            err = undefined;
        } else {
            err = {
                status: 200,
                data: {
                    message: message || '',
                },
            };
        }
    } else if (isError && error) {
        err = error as TypeError;
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <img
                        className="w-8 h-8 mr-2"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo"
                    ></img>
                    PlaylistTool
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Reset your password
                        </h1>

                        {isSuccess && !err && (
                            <div className="p-2 border rounded border-green-500 bg-green-400 text-sm">
                                An email has been sent to your email address.
                            </div>
                        )}

                        {!!err && (
                            <div className="p-2 border rounded border-red-500 bg-red-400 text-sm">
                                {err.status < 500
                                    ? err.data.message
                                    : 'Something went wrong on our side, please try again.'}
                            </div>
                        )}
                        {(!isSuccess || !!err) && (
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={async (event) => {
                                    event.preventDefault();
                                    try {
                                        await ForgotPasswordMutation(user);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                    return false;
                                }}
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={user.email}
                                        onChange={(event) =>
                                            setUser({
                                                ...user,
                                                email: event.target.value,
                                            })
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                    ></input>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                >
                                    Reset Password
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
