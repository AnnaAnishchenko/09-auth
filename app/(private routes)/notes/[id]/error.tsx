"use client";

interface ErrorProps {
  error: Error;
}

function Error({ error }: ErrorProps) {
  return <p>Could not fetch note details. {error.message}</p>;
}

export default Error;
