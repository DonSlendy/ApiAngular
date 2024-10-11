export class FormValidator {
    static getErrorMessage(formControlName: string, errors: any): string | null {
        if (!errors) return null;

        if (errors['required']) {
            return 'Este campo es requerido.';
        }

        if (errors['minlength']) {
            return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres.`;
        }

        if (errors['pattern']) {
            return 'El formato ingresado es incorrecto.';
        }

        if(errors['email']) {
            return 'El correo no es válido';
        }

        return null;
    }
}