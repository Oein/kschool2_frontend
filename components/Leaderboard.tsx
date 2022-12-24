const showRank = (rank: number) => {
  if (rank == 1) return "🥇";
  if (rank == 2) return "🥈";
  if (rank == 3) return "🥉";
  return rank;
};

const comma = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export interface Rank {
  schoolCode: string;
  schoolRank: string;
  schoolName: string;
  pop: string;
}

export default function Leaderboard({
  onClose,
  leaderboard,
}: {
  onClose: () => void;
  leaderboard: Rank[];
}) {
  return (
    <>
      <div className="leaderboard-container" onClick={onClose}>
        <div className="leaderboard">
          <span
            className="title fontSize"
            style={{
              fontSize: "18px",
              justifyContent: "left",
              display: "inline",
            }}
          >
            🏆 랭킹 ({length == -1 ? "⏳" : length} 학교 참여)
          </span>
          <span className="close fontSize" onClick={onClose}>
            ❌
          </span>
          <div className="ranking">
            <ol className="rank">
              {leaderboard.length > 0 ? (
                leaderboard.map((r, i) => {
                  return (
                    <li className="school" key={i}>
                      <div className="schoolRank fontSize">
                        {showRank(parseInt(r.schoolRank))}
                      </div>
                      <div className="schoolName fontSize">{r.schoolName}</div>
                      <span className="schoolTier tierIcon {tier(r.pop, r.schoolRank)}"></span>
                      <div className="schoolScore fontSize">
                        {comma(parseInt(r.pop))}
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="loading fontSize">로딩중... ⏳</li>
              )}
            </ol>
          </div>
        </div>
      </div>
      <style>{`
      .leaderboard-container {
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items : center;
        z-index: 3;
      }
      .leaderboard {
        background-color: white;
        width: 80%;
        padding: 1rem;
        height: 80%;
        user-select: none;
        border-radius: 10px;
      }
      .close {
        cursor: pointer;
        float: right;
      }
      .ranking {
        height: 85%;
        margin-top: 30px;
        overflow-y: auto;
      }
      .rank {
        list-style: none;
        padding: 0;
      }
      .school {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #eee;
        padding: 10px 0;
      }
      .schoolRank {
        box-sizing: inherit;
        cursor: default;
        justify-content: center;
        user-select: none;
        margin-right: 5px;
      }
      .schoolName {
        box-sizing: inherit;
        cursor: default;
        justify-content: center;
        user-select: none;
      }
      .schoolTier {
        box-sizing: inherit;
        cursor: default;
        justify-content: center;
        user-select: none;
      }
      .schoolScore {
        text-align: center;
        box-sizing: inherit;
        cursor: default;
        margin-left: auto;
        user-select: none;
        padding-right: 10px;
      }
      .loading {
        text-align: center;
      }
      .fontSize {
        font-size: 18px;
      }
      .tierIcon {
        width: 40px;
        height: 42px;
      }
      .mySchool {
        color: limegreen;
      }
      @media (max-width: 500px) {
        .fontSize {
          font-size: 15px;
        }
        .tierIcon {
          width: 20px;
          height: 21px;
        }
      }
      .tierIcon {
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        display: inline-block;
      }
      .bronze {
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.5 13L6 3L17 13H10.5Z' fill='%23A86350'/%3E%3Cpath d='M10.5 13L6 3V18L10.5 13Z' fill='%23663228'/%3E%3Cpath d='M6 18V3L17 13H10.5L6 18Z' stroke='%2337221F' stroke-width='1.8'/%3E%3C/svg%3E");
      }
      .silver {
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.2717 14.5676C14.4563 15.9394 13.2691 17.021 11.9131 17.6276L9.97272 11.3003L10.7472 4.48078C12.1404 4.45651 13.7761 5.31448 14.7409 6.27787C15.7058 7.24126 16.2863 8.59474 16.3831 10.1068C16.4799 11.6189 16.087 13.1957 15.2717 14.5676Z' fill='%2397928E'/%3E%3Cpath d='M2.12311 10.5356C2.23324 8.91676 2.90237 7.38641 4.01606 6.20632L9.60696 11.0138L12.567 17.5321C11.09 18.2039 8.86356 18.1922 7.29616 17.7725C5.72877 17.3527 4.35588 16.4015 3.41228 15.0814C2.46867 13.7614 2.01298 12.1545 2.12311 10.5356Z' fill='%23616161'/%3E%3Cmask id='path-3-inside-1_1_185' fill='white'%3E%3Cpath d='M3.84315 5.34315C2.5344 6.65189 1.71994 8.37394 1.53852 10.2159C1.35711 12.0578 1.81997 13.9056 2.84824 15.4446C3.87652 16.9835 5.40658 18.1183 7.17772 18.6555C8.94887 19.1928 10.8515 19.0993 12.5615 18.391C14.2714 17.6828 15.6829 16.4035 16.5554 14.7712C17.4279 13.1389 17.7074 11.2546 17.3463 9.43928C16.9852 7.624 16.0059 5.99008 14.5751 4.81592C13.1444 3.64176 11.3508 3 9.5 3L9.5 9.7471C9.78987 9.7471 10.0708 9.84761 10.2948 10.0315C10.5189 10.2154 10.6723 10.4713 10.7288 10.7556C10.7854 11.0399 10.7416 11.335 10.605 11.5906C10.4683 11.8463 10.2473 12.0466 9.97947 12.1575C9.71166 12.2685 9.41369 12.2831 9.1363 12.199C8.85892 12.1148 8.61929 11.9371 8.45825 11.6961C8.29721 11.4551 8.22472 11.1657 8.25313 10.8772C8.28154 10.5887 8.4091 10.319 8.61406 10.1141L3.84315 5.34315Z'/%3E%3C/mask%3E%3Cpath d='M3.84315 5.34315C2.5344 6.65189 1.71994 8.37394 1.53852 10.2159C1.35711 12.0578 1.81997 13.9056 2.84824 15.4446C3.87652 16.9835 5.40658 18.1183 7.17772 18.6555C8.94887 19.1928 10.8515 19.0993 12.5615 18.391C14.2714 17.6828 15.6829 16.4035 16.5554 14.7712C17.4279 13.1389 17.7074 11.2546 17.3463 9.43928C16.9852 7.624 16.0059 5.99008 14.5751 4.81592C13.1444 3.64176 11.3508 3 9.5 3L9.5 9.7471C9.78987 9.7471 10.0708 9.84761 10.2948 10.0315C10.5189 10.2154 10.6723 10.4713 10.7288 10.7556C10.7854 11.0399 10.7416 11.335 10.605 11.5906C10.4683 11.8463 10.2473 12.0466 9.97947 12.1575C9.71166 12.2685 9.41369 12.2831 9.1363 12.199C8.85892 12.1148 8.61929 11.9371 8.45825 11.6961C8.29721 11.4551 8.22472 11.1657 8.25313 10.8772C8.28154 10.5887 8.4091 10.319 8.61406 10.1141L3.84315 5.34315Z' stroke='%2355504B' stroke-width='3.6' mask='url(%23path-3-inside-1_1_185)'/%3E%3Cpath d='M10.5 13L6 3L17 13H10.5Z' fill='%2397928E'/%3E%3Cpath d='M10.5 13L6 3V18L10.5 13Z' fill='%23616161'/%3E%3Cpath d='M6 18V3L17 13H10.5L6 18Z' stroke='%23363434' stroke-width='1.8'/%3E%3C/svg%3E");
      }
      .gold {
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.2717 14.5676C14.4563 15.9394 13.2691 17.021 11.9131 17.6276L9.97272 11.3003L10.7472 4.48078C12.1404 4.45651 13.7761 5.31448 14.7409 6.27787C15.7058 7.24126 16.2863 8.59474 16.3831 10.1068C16.4799 11.6189 16.087 13.1957 15.2717 14.5676Z' fill='%23E39921'/%3E%3Cpath d='M2.12311 10.5356C2.23324 8.91676 2.90237 7.38641 4.01606 6.20632L9.60695 11.0138L12.567 17.5321C11.09 18.2039 8.86356 18.1922 7.29616 17.7725C5.72876 17.3527 4.35588 16.4015 3.41227 15.0814C2.46867 13.7614 2.01297 12.1545 2.12311 10.5356Z' fill='%23C57624'/%3E%3Cmask id='path-3-inside-1_2_233' fill='white'%3E%3Cpath d='M3.84315 5.34315C2.5344 6.65189 1.71994 8.37394 1.53852 10.2159C1.35711 12.0578 1.81997 13.9056 2.84824 15.4446C3.87652 16.9835 5.40658 18.1183 7.17772 18.6555C8.94887 19.1928 10.8515 19.0993 12.5615 18.391C14.2714 17.6828 15.6829 16.4035 16.5554 14.7712C17.4279 13.1389 17.7074 11.2546 17.3463 9.43928C16.9852 7.624 16.0059 5.99008 14.5751 4.81592C13.1444 3.64176 11.3508 3 9.5 3L9.5 9.7471C9.78987 9.7471 10.0708 9.84761 10.2948 10.0315C10.5189 10.2154 10.6723 10.4713 10.7288 10.7556C10.7854 11.0399 10.7416 11.335 10.605 11.5906C10.4683 11.8463 10.2473 12.0466 9.97947 12.1575C9.71166 12.2685 9.41369 12.2831 9.1363 12.199C8.85892 12.1148 8.61929 11.9371 8.45825 11.6961C8.29721 11.4551 8.22472 11.1657 8.25313 10.8772C8.28154 10.5887 8.4091 10.319 8.61406 10.1141L3.84315 5.34315Z'/%3E%3C/mask%3E%3Cpath d='M3.84315 5.34315C2.5344 6.65189 1.71994 8.37394 1.53852 10.2159C1.35711 12.0578 1.81997 13.9056 2.84824 15.4446C3.87652 16.9835 5.40658 18.1183 7.17772 18.6555C8.94887 19.1928 10.8515 19.0993 12.5615 18.391C14.2714 17.6828 15.6829 16.4035 16.5554 14.7712C17.4279 13.1389 17.7074 11.2546 17.3463 9.43928C16.9852 7.624 16.0059 5.99008 14.5751 4.81592C13.1444 3.64176 11.3508 3 9.5 3L9.5 9.7471C9.78987 9.7471 10.0708 9.84761 10.2948 10.0315C10.5189 10.2154 10.6723 10.4713 10.7288 10.7556C10.7854 11.0399 10.7416 11.335 10.605 11.5906C10.4683 11.8463 10.2473 12.0466 9.97947 12.1575C9.71166 12.2685 9.41369 12.2831 9.1363 12.199C8.85892 12.1148 8.61929 11.9371 8.45825 11.6961C8.29721 11.4551 8.22472 11.1657 8.25313 10.8772C8.28154 10.5887 8.4091 10.319 8.61406 10.1141L3.84315 5.34315Z' stroke='%238B4700' stroke-width='3.6' mask='url(%23path-3-inside-1_2_233)'/%3E%3Cpath d='M10.5 13L6 3L17 13H10.5Z' fill='%23E39921'/%3E%3Cpath d='M10.5 13L6 3V18L10.5 13Z' fill='%23C57624'/%3E%3Cpath d='M6 18V3L17 13H10.5L6 18Z' stroke='%23573007' stroke-width='1.8'/%3E%3C/svg%3E");
      }
      .platinum {
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 8L17.5 10L16 10.5V14.5L12.5 18L10 14L13 8Z' fill='%23007F59'/%3E%3Cpath d='M12.5 17.5L10.05 12L5.5 10L3 16.5L6 15C6.66269 18.7967 7.99691 18.9334 12.5 17.5Z' fill='%2300432F'/%3E%3Cmask id='path-3-inside-1_16_10' fill='white'%3E%3Cpath d='M17 12C17 13.3543 16.6071 14.6795 15.8691 15.815C15.131 16.9505 14.0794 17.8475 12.8417 18.3973C11.604 18.947 10.2334 19.126 8.89608 18.9124C7.55874 18.6988 6.31206 18.1019 5.30718 17.194L10 12H17Z'/%3E%3C/mask%3E%3Cpath d='M17 12C17 13.3543 16.6071 14.6795 15.8691 15.815C15.131 16.9505 14.0794 17.8475 12.8417 18.3973C11.604 18.947 10.2334 19.126 8.89608 18.9124C7.55874 18.6988 6.31206 18.1019 5.30718 17.194L10 12H17Z' stroke='%23002119' stroke-width='3.6' mask='url(%23path-3-inside-1_16_10)'/%3E%3Cpath d='M3 17L7 5L18 10L10 12L3 17Z' stroke='%23002119' stroke-width='1.2'/%3E%3Cpath d='M10.5 13L6 3L17 13H10.5Z' fill='%23018059'/%3E%3Cpath d='M10.5 13L6 3V18L10.5 13Z' fill='%2300432F'/%3E%3Cpath d='M6 18V3L17 13H10.5L6 18Z' stroke='%23002119' stroke-width='1.8'/%3E%3C/svg%3E%0A");
      }
      .diamond {
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 8L17.5 10L16 10.5V14.5L12.5 18L10 14L13 8Z' fill='%2347EBFD'/%3E%3Cpath d='M12.5 17.5L10.05 12L5.5 10L3 16.5L6 15C6.66269 18.7967 7.99691 18.9334 12.5 17.5Z' fill='%2300C9D4'/%3E%3Cmask id='path-3-inside-1_16_33' fill='white'%3E%3Cpath d='M17 12C17 13.3543 16.6071 14.6795 15.8691 15.815C15.131 16.9505 14.0794 17.8475 12.8417 18.3973C11.604 18.947 10.2334 19.126 8.89608 18.9124C7.55874 18.6988 6.31206 18.1019 5.30718 17.194L10 12H17Z'/%3E%3C/mask%3E%3Cpath d='M17 12C17 13.3543 16.6071 14.6795 15.8691 15.815C15.131 16.9505 14.0794 17.8475 12.8417 18.3973C11.604 18.947 10.2334 19.126 8.89608 18.9124C7.55874 18.6988 6.31206 18.1019 5.30718 17.194L10 12H17Z' stroke='%23008088' stroke-width='3.6' mask='url(%23path-3-inside-1_16_33)'/%3E%3Cpath d='M3 17L7 5L18 10L10 12L3 17Z' stroke='%2329AAA1' stroke-width='1.2'/%3E%3Cpath d='M10.5 13L6 3L17 13H10.5Z' fill='%2347EBFD'/%3E%3Cpath d='M10.5 13L6 3V18L10.5 13Z' fill='%2300C9D4'/%3E%3Cpath d='M6 18V3L17 13H10.5L6 18Z' stroke='%23008088' stroke-width='1.8'/%3E%3C/svg%3E%0A");
      }
      .none {
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.5 13L6 3L17 13H10.5Z' fill='%23DCDCDC'/%3E%3Cpath d='M10.5 13L6 3V18L10.5 13Z' fill='white'/%3E%3Cpath d='M6 18V3L17 13H10.5L6 18Z' stroke='black' stroke-width='1.8'/%3E%3C/svg%3E%0A");
      }
    `}</style>
    </>
  );
}
