import React, { useState } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import RotationCSVReader from "./csv-readers/RotationCSVReader";

const InputContainer = styled("div")({
    width: "100%",
});

const InputLabel = styled(Typography)({
    alignSelf: "flex-start",
});

export default function RotationUploadInput(props) {
    const { onRotationsDataLoaded, onRotationsDataRemoved, reportFileName, rotationsFileName } = props;

    const [rotationDataFileName, setRotationDataFileName] = useState(undefined);

    const rotations = [];

    const processRotationDataRow = (results, parser) => {
        const { data } = results;

        const relevantData = {
            id: `${data["Power ID"]}-${data["Period"]}`,
            LastName: data["LastName"],
            FirstName: data["First Name"],
            Resident: `${data["LastName"].toUpperCase()}, ${data["First Name"]}`,
            Email: data["Email"],
            PGY: data["PGY"],
            TraineeProgram: data["Trainee Program"],
            Base: data["Base"],
            Hospital: data["Hospital"],
            Rotation: data["Rotation"],
            Team: data["Team"] === "null" ? "" : data["Team"],
            RotationStartDate: data["Rotation Start Date"],
            Block: data["Period"],
        };
        rotations.push(relevantData);
    };

    const allRotationDataRowsProcessed = () => {
        onRotationsDataLoaded(rotations);
    };

    const handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    };

    const handleOnRemoveRotationDataFile = (data) => {
        setRotationDataFileName(undefined);
        onRotationsDataRemoved();
    };

    return (
        <>
            <InputLabel component='h2' variant='h4' align='left'>
                Rotations Data
            </InputLabel>
            <InputContainer>
                <RotationCSVReader
                    stepFunction={processRotationDataRow}
                    completeFunction={allRotationDataRowsProcessed}
                    onError={handleOnError}
                    onRemoveFile={handleOnRemoveRotationDataFile}
                    reportFileName={reportFileName}
                    currentFileLoadedName={rotationsFileName}
                />
            </InputContainer>
        </>
    );
}
