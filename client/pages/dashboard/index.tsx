import { useQuery, useMutation } from "@apollo/client";
import { GET_COURSES } from "@/Graphql/Queries";
import { CREATE_COURSE } from "@/Graphql/Mutations";
import { useEffect, useState } from "react";
import react from "react";
import Router from "next/router";
import { Box, Container } from "@mui/system";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export default function DashboardPage() {
  interface Course {
    id: string;
    name: string;
  }

  const { data, loading } = useQuery(GET_COURSES);
  const [courseInput, setCourseInput] = useState<string>("");
  const [createCourse, { error }] = useMutation(CREATE_COURSE);

  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
    setCourseInput("");
  }

  function CourseCard({ course }: { course: Course }) {
    return (
      <Box sx={{ width: 150, height: 150, bgcolor: "background.paper" }}>
        <Card
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <CardActionArea
            sx={{
              width: "100%",
              height: "100%",
            }}
            onClick={(e) => {
              e.preventDefault();
              Router.push(`/course/${course.id}`);
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                color: "white",
                background:
                  "linear-gradient(to right bottom, #36EAEF, #6B0AC9)",
              }}
            >
              <Typography variant="h6">{course.name}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    );
  }

  function handleNewCourseCreate(courseName: string) {
    createCourse({
      variables: {
        name: courseName,
      },
    }).then((res) => {
      Router.push(`/dashboard`);
    });
  }

  function NewCourseFormDialog() {
    const courseInputRef = React.useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>("");
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the course you want to create.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="courseName"
            label="Course Name"
            type="text"
            error={error !== ""}
            helperText={error}
            fullWidth
            variant="standard"
            inputRef={courseInputRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              if (courseInputRef.current?.value === "") {
                setError("Course name cannot be empty");
                return;
              }
              if (
                data.getAllCourses.find(
                  (course: Course) =>
                    course.name === courseInputRef.current?.value
                )
              ) {
                setError("Course name already taken");
                return;
              }
              handleNewCourseCreate(courseInputRef.current?.value as string);
              handleClose();
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  function NewCourseCard() {
    return (
      <Box sx={{ width: 150, height: 150, bgcolor: "background.paper" }}>
        <Card
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <CardActionArea
            sx={{
              width: "100%",
              height: "100%",
            }}
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                color: "white",
                background:
                  "linear-gradient(to right bottom, #36EFFF, #6B0A11)",
              }}
            >
              <Typography variant="h6">Create New Course</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    );
  }
  if (loading) return <div>Loading...</div>;
  return (
    <Container
      sx={{
        mt: 4,
      }}
    >
      <CssBaseline />
      <p>Here is a list of all the courses you have created:</p>
      <Grid container spacing={2}>
        {data.getAllCourses.map((course: Course) => (
          <Grid item key={`gridItemContainer-${course.id}`}>
            <CourseCard course={course} key={course.id} />
          </Grid>
        ))}
        <Grid item>
          <NewCourseCard />
          <NewCourseFormDialog />
        </Grid>
      </Grid>
    </Container>
  );
}
