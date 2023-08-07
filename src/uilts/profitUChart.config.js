function config(MaxForY,MinForY,enable=false){
    let opt={
        timing: "easeOut",
        duration: 1000,
        rotate: false,
        rotateLock: false,
        color: ["#FAC858", "#EE6666", "#1890FF", "#91CB74", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
        padding: [15, 15, 0, 5],
        fontSize: 13,
        fontColor: "#f8f8f8",
        dataLabel: true,
        dataPointShape: true,
        dataPointShapeType: "solid",
        touchMoveLimit: 60,
        enableScroll: false,
        enableMarkLine: enable,
        legend: {
            show: false,
            position: "bottom",
            float: "center",
            padding: 5,
            margin: 5,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            fontSize: 13,
            fontColor: "#666666",
            lineHeight: 11,
            hiddenColor: "#CECECE",
            itemGap: 10
        },
        xAxis: {
            disableGrid: true,
            disabled: false,
            axisLine: true,
            axisLineColor: "#F8F8F8",
            calibration: false,
            fontColor: "#F8F8F8",
            fontSize: 13,
            lineHeight: 20,
            marginTop: 0,
            rotateLabel: false,
            rotateAngle: 45,
            itemCount: 5,
            boundaryGap: "center",
            splitNumber: 5,
            gridColor: "#CCCCCC",
            gridType: "solid",
            dashLength: 4,
            gridEval: 1,
            scrollShow: false,
            scrollAlign: "left",
            scrollColor: "#A6A6A6",
            scrollBackgroundColor: "#EFEBEF",
            title: "",
            titleFontSize: 13,
            titleOffsetY: 0,
            titleOffsetX: 0,
            titleFontColor: "#666666",
            format: ""
        },
        yAxis: {
            data: [
                {
                    min: MinForY,
                    axisLine: true,
                    axisLineColor: "#F8F8F8",
                    max: MaxForY
                }
            ],
            disabled: false,
            disableGrid: false,
            splitNumber: 4,
            gridType: "dash",
            dashLength: 8,
            gridColor: "#666666",
            padding: 10,
            showTitle: false
        },
        extra: {
            column: {
                type: "group",
                width: 30,
                activeBgColor: "#000000",
                activeBgOpacity: 0.08,
                seriesGap: 2,
                categoryGap: 3,
                barBorderCircle: true,
                linearType: "custom",
                linearOpacity: 1,
                customColor: [
                    "#FA7D8D",
                    "#EB88E2"
                ],
                colorStop: 0,
                meterBorder: 1,
                meterFillColor: "#FFFFFF",
                labelPosition: "outside"
            },
            tooltip: {
                showBox: false,
                showArrow: true,
                showCategory: false,
                borderWidth: 0,
                borderRadius: 0,
                borderColor: "#000000",
                borderOpacity: 0.7,
                bgColor: "#939599",
                bgOpacity: 0.7,
                gridType: "solid",
                dashLength: 4,
                gridColor: "#CCCCCC",
                boxPadding: 3,
                fontSize: 13,
                lineHeight: 20,
                fontColor: "#ffffff",
                legendShow: false,
                legendShape: "auto",
                splitLine: true,
                horizentalLine: false,
                xAxisLabel: true,
                yAxisLabel: false,
                labelBgColor: "#FFFFFF",
                labelBgOpacity: 0.7,
                labelFontColor: "#666666"
            },
            markLine: {
                type: "dash",
                dashLength: 4,
                data: [
                    {
                        value: 0,
                        lineColor: "#F2D06D",
                        showLabel: false,
                        labelAlign: "left",
                        labelOffsetX: 0,
                        labelOffsetY: 0,
                        labelPadding: 6,
                        labelText: "",
                        labelFontSize: 0,
                        labelFontColor: "#666666",
                        labelBgColor: "#DFE8FF",
                        labelBgOpacity: 0.8
                      }
                ]
            }
        }
    }
    return  opt
}
export default config