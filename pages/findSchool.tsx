/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState } from "react";
import { fetchSchool } from "../functions/fetchSchool";

export default function FindSchool() {
  var router = useRouter();
  var [loading, setLoading] = useState(false);
  var [schools, setSchools] = useState<
    {
      schoolName: string;
      cityProvince: string;
      schoolCode: string;
      schoolAddress: string;
    }[]
  >([]);
  var [schoolName, setSchoolName] = useState("");

  var getSchool = async () => {
    if (
      schoolName.toLocaleLowerCase().replaceAll(" ", "") ==
      "nevergonnagiveyouup"
    ) {
      router.push("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      return;
    }

    if (schoolName.toLocaleLowerCase().replaceAll(" ", "") == "삐딱하게") {
      router.push("https://www.youtube.com/watch?v=RKhsHGfrFmY");
      return;
    }

    if (!loading) {
      setLoading(true);
      setSchools((await fetchSchool(schoolName)) || []);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="findSchool">
        <div className="title">
          <h1>K-SCHOOL</h1>
          <img className="jo" src="/jo.png" draggable="false" alt="" />
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="학교를 검색해주세요."
            className="schoolName-input"
            onChange={(e) => {
              setSchoolName(e.target.value);
            }}
            value={schoolName}
            onKeyPress={(e) => {
              if (e.charCode === 13) {
                getSchool();
              }
            }}
          />
          <button
            className="search"
            onClick={() => { getSchool(); }
          }>
            🔍
          </button>
        </div>
        <div className="output">
          {loading ? (
            <div className="none">로딩중... ⏳</div>
          ) : schools.length > 0 ? (
            schools.map((school, i) => {
              return (
                <div
                  className="school"
                  key={"SC" + i.toString()}
                  onClick={() => {
                    localStorage.setItem("schoolName", school.schoolName);
                    localStorage.setItem("schoolCode", school.schoolCode);
                    localStorage.setItem("myPop", "0");
                    router.push("/pop");
                  }}
                >
                  <div className="schoolName">{school.schoolName}</div>
                  <div className="schoolAddress">{school.schoolAddress}</div>
                </div>
              );
            })
          ) : (
            <>
              <div className="none">검색 결과가 없습니다.</div>
              <div className="none">
                자신의 학교가 검색되지 않을 경우
                <br />
                awesomeGolang@gmail.com 으로 연락주세요.
              </div>
            </>
          )}
        </div>
      </div>

      <style>
        {`
        .ad {
            margin: 0 auto;
          }
          .findSchool {
            position: fixed;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .title {
            display: flex;
            justify-content: center;
          }
          .input {
            height: 50px;
            display: flex;
            margin: 0 auto;
            width: 80%;
          }
          .schoolName-input {
            height: inherit;
            display: grid;
            width: 80%;
            padding-left: 20px;
            margin: 0 auto;
            border-radius: 10px;
            font-size: 20px;
          }
          .search {
            background-color: transparent;
            cursor: pointer;
            display: block;
            border: 0;
            padding: 0;
            margin: 0;
            font-size: 30px;
          }
          .output {
            display: flex;
            flex-direction: column;
            margin: 40px auto;
            max-width: 800px;
            height: 80%;
            width: 100%;
            font-size: 20px;
            overflow: auto;
          }
          .output .none {
            display: flex;
            margin: 20px auto;
            text-align: center;
          }
          .school {
            display: flex;
            flex-direction: column;
            margin: 4px auto;
            border: 1px solid #ddd;
            border-radius: 100px;
            cursor: pointer;
            width: 80%;
          }
          .school:hover {
            border-color: #bbb;
          }
          .schoolName {
            margin-top: 2px;
            text-align: center;
          }
          .schoolAddress {
            margin-bottom: 2px;
            text-align: center;
          }
          .jo {
            cursor: pointer;
            user-select: none;
            width: 100px;
            height: 100px;
          }
          @media (max-width: 500px) {
            .title {
              font-size: 10px;
            }
            .output {
              font-size: 16px;
            }
            .schoolName-input {
              font-size: 16px;
            }
            .input {
              height: 40px;
            }
            .search {
              font-size: 20px;
            }
            .jo {
              width: 45px;
              height: 45px;
            }
          }
          @media (max-width: 300px) {
            .title {
              font-size: 8px;
            }
            .output {
              font-size: 12px;
            }
            .schoolName-input {
              padding-left: 8px;
              font-size: 14px;
            }
            .input {
              font-size: 33px;
            }
            .search {
              font-size: 18px;
            }
            .jo {
              width: 35px;
              height: 35px;
            }
          }
          h1 {
            font-size: 2em;
          }
          `}
      </style>
    </>
  );
}
