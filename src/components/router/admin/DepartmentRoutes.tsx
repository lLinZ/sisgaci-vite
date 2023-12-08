import { Routes, Route } from "react-router-dom"
import { Departments, RegisterDepartment } from "../../../pages/admin/departments"

export const DepartmentRoutes = () => {
    return <Routes>
        <Route path='/admin/departments' element={<Departments />} />
        <Route path='/admin/department/add' element={<RegisterDepartment />} />
    </Routes>
}
