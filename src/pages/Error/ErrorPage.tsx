import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	// isRouteErrorResponse is used, as const error is explicitly defined as a type of "unknown"
	// As per the type "unknown" we won't be able to access any
	// if (isRouteErrorResponse(error)) {
	// 	return (
	// 		<div>
	// 			<h1>Oops!</h1>
	// 			<h2>{error.status}</h2>
	// 			<p>{error.statusText}</p>
	// 			{error.data?.message && <p>{error.data.message}</p>}
	// 		</div>
	// 	);
	// } else {
	// 	return <div>Oops</div>;
	// }
	if (isRouteErrorResponse(error)) {
		return (
			<p>
				{error.status} {error.statusText}
			</p>
		);
	} else {
		return <p> 404 Page Not Found! </p>;
	}
}
