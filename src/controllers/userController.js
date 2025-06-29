class UserController {
    #UserService
    constructor(userService) {
        this.#UserService = userService
    }


    async createUser(req, res) {
        try {
            const { name, email, password, confirmPassword, role } = req.body;            
            const response = await this.#UserService.createUserService(name, email, password, confirmPassword, role)
            return res.status(response.status).json(response);

        } catch (error) {
            console.error("Error in user creation:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });

        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, role } = req.body;
            const user = await this.#UserService.updateUserService(id, name, email, role)
            return res.status(user.status).json(user);
        } catch (error) {
            console.error("Error Updating User:", error.message || error)
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }

    async getAllUsers(req, res) {
        try {
            const response = await this.#UserService.getAllUserService()
            return res.status(response.status).json(response);

        } catch (error) {
            console.error("Error Fetching Users:", error.message || error)
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const response = await this.#UserService.deleteUserService(id)
            return res.status(response.status).json(response);
        } catch (error) {

            console.error("Error Deleting User:", error.message || error)
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }

    async getProfile(req, res) {
        try {            
            const id = req.user.id
            const response = await this.#UserService.getProfile(id)
            return res.status(response.status).json(response);
        } catch (error) {

            console.error("Error User:", error.message || error)
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
    async updateProfile(req, res) {
        try {            
            const {name}=req.body
            const id = req.user.id
            const response = await this.#UserService.updateProfile(name,id)
            return res.status(response.status).json(response);
        } catch (error) {

            console.error("Error User:", error.message || error)
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
    async  changePassword (req, res)  {
        const email =req.user.email
        
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        try{
            const response = await this.#UserService.changePassword(currentPassword, newPassword, confirmNewPassword,email )
            return res.status(response.status).json(response);
        }
        catch (error) {
            console.error("Error User:", error.message || error)
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }


}

export default UserController