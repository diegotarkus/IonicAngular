export class ApiResponse<type>{
    msg: string = "";
    data: type [] = [];
    success: boolean = true;
    isFailed: boolean = false;
}