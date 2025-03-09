export class MemberDTO {

    constructor({ id, username, role }) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.url = `/api/member/${id}`
    }
}
export class MemberDetailDTO {

    constructor({ id, username, firstname, lastname, email, password, role }) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}