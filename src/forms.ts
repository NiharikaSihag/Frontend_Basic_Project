// import Swal from 'sweetalert2'; // Assuming you're using sweetalert2
declare const Swal: any;


export function saveData(): void {
    const myEmailInput = document.getElementById('myEmailInput') as HTMLInputElement | null;

    if (!myEmailInput) {
        console.error('myEmailInput element not found.');
        Swal.fire('Error', 'Email input element not found.', 'error');
        return;
    }

    const myEmail = myEmailInput.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailPattern.test(myEmail)) {
        Swal.fire('Please enter a valid email address.');
        return;
    }

    let emails: string[] = JSON.parse(localStorage.getItem('userEmails') || '[]') as string[];
    emails.push(myEmail);
    localStorage.setItem('userEmails', JSON.stringify(emails));

    Swal.fire({
        title: 'Success!',
        text: `Pricing updates, shopping tips will be shared at ${myEmail}`,
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        scrollbarPadding: false,
        showConfirmButton: true, // Explicitly show the confirm button
        confirmButtonText: 'OK', // Customize the button text (optional)
    });
}