# Student Management Server

## Hướng dẫn sử dụng

1. clone dự án từ github về

    ```cmd
      git clone https://github.com/NQTrung08/Student-Management-Server.git
    ```

2. tải các package về cho dự án

    ```cmd
      npm install
    ```
## Sử dụng api online

```cmd
    https://student-management-server-poti.onrender.com/api/auth/login
    msv: a41954
    password: a41954
```

## Api

1. login
   1. cho phép người dùng đăng nhập với tài khoản được tạo từ admin là mã sinh viên, mật khẩu được mã hóa từ mã sinh viên

      ```cmd
        localhost:8080/api/auth/login
      ```

2. refresh
   1. Giúp làm mới accessToken khi hết hạn để duy trì phiên đăng nhập

      ```cmd
        localhost:8080/api/auth/refresh
      ```

3. validateToken
   1. để kiểm tra xem token còn hạn

      ```cmd
        localhost:8080/api/auth/validateToken
      ```

4. Users
   1. CRUD USERS, tìm kiếm, khôi phục, cập nhật thông tin cá nhân, sử dụng kỹ thuật **soft delete**

      ```cmd
        localhost:8080/api/user/getAll
        localhost:8080/api/user/:id
        localhost:8080/api/user/create-user
        localhost:8080/api/user/updateByAdmin/:id
        localhost:8080/api/user/delete/:id
        localhost:8080/api/user/searchStudents
        localhost:8080/api/user/restore
        localhost:8080/api/user/updateProfilde
      ```

5. Courses
   1. CRUD Courses

      ```cmd
        localhost:8080/api/course/getAll
        localhost:8080/api/course/:id
        localhost:8080/api/course/add-course
        localhost:8080/api/course/update/:id
        localhost:8080/api/course/delete/:id
      ```

6. Semesters
   1. CRUD Semesters

      ```cmd
        localhost:8080/api/semester/getAll
        localhost:8080/api/semester/:id
        localhost:8080/api/semester/create
        localhost:8080/api/semester/update/:id
        localhost:8080/api/semester/delete/:id
      ```

7. Teacher
   1. CRUD Teachers

      ```cmd
        localhost:8080/api/teacher/getAll
        localhost:8080/api/teacher/:teacherId
        localhost:8080/api/teacher/create-teacher
      ```

8. Majors
   1. CRUD Majors

      ```cmd
        localhost:8080/api/major/getAll
        localhost:8080/api/major/:id
        localhost:8080/api/major/create
        localhost:8080/api/major/update/:id
        localhost:8080/api/major/delete/:id
      ```

9. Grades
   1. CRUD điểm của từng môn học theo bảng điểm từng kỳ, lấy điểm theo từng bảng điểm (transcript)

      ```cmd
        localhost:8080/api/grade/getAll
        localhost:8080/api/grade/:id
        localhost:8080/api/grade/create
        localhost:8080/api/grade/update/:gradeId
        localhost:8080/api/grade/delete/:gradeId
        localhost:8080/api/grade/transcript/:transcriptId
      ```

10. Transcripts
    1. CRUD bảng điểm của từng sinh viên theo bảng điểm từng kỳ, có sử dụng **soft delete** khi student bị xóa, khôi phục bảng điểm, tìm kiếm các bảng điểm, lấy ra các điểm của từng sinh viên theo từng kỳ, lấy ra tất cả điểm của sinh viên

      ```cmd
        localhost:8080/api/transcript/getAll
        localhost:8080/api/transcript/:id
        localhost:8080/api/transcript/create
        localhost:8080/api/transcript/update/:id
        localhost:8080/api/transcript/delete/:id
        localhost:8080/api/transcript/restore
        localhost:8080/api/transcript/search
        localhost:8080/api/transcript/:studentId/semester/:semesterId
        localhost:8080/api/transcript/student/:studentId
      ```
